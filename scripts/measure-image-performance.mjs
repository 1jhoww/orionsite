import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
 ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const label=process.argv[2]||'before';
await mkdir(`outputs/${label}`,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
for(const route of ['/terceirizacao','/'])for(let run=1;run<=3;run++){
 const context=await browser.newContext({viewport:{width:1366,height:768},deviceScaleFactor:1});
 const page=await context.newPage();
 const cdp=await context.newCDPSession(page);
 await cdp.send('Network.enable');
 await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await page.addInitScript(()=>{
  localStorage.setItem('orion-cookie-consent',JSON.stringify({version:1,necessary:true,functional:false}));
  window.qa={lcp:0,cls:0};
  new PerformanceObserver(list=>{for(const e of list.getEntries())window.qa.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qa.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
 });
 await page.goto(`http://127.0.0.1:4173${route}`,{waitUntil:'load'});
 await page.waitForTimeout(15000);
 const data=await page.evaluate(()=>({...window.qa,resources:performance.getEntriesByType('resource').map(r=>({name:new URL(r.name).pathname,bytes:r.transferSize,duration:r.duration,start:r.startTime})),images:[...document.images].map(i=>({src:i.currentSrc,width:i.clientWidth,height:i.clientHeight,loading:i.loading,priority:i.fetchPriority,complete:i.complete}))}));
 results.push({route,run,...data});
 await context.close();
}
await writeFile(`outputs/${label}/performance.json`,JSON.stringify({conditions:{browser:browser.version(),viewport:'1366x768',dpr:1,cpu:4,latency:150,bytesPerSecond:200000,cache:'cold',consent:'necessary'},results},null,2));
console.log(JSON.stringify(results.map(r=>({route:r.route,run:r.run,lcp:r.lcp,cls:r.cls,requests:r.resources.length,bytes:r.resources.reduce((s,r)=>s+r.bytes,0),images:r.resources.filter(r=>/webp|png|svg/.test(r.name)).map(r=>({name:r.name,bytes:r.bytes}))})),null,2));
await browser.close();

