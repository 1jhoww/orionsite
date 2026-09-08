import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
// Optional QA runtime; no browser dependency is added to the site bundle.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
 ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const label = process.argv[2] || 'verified';
const base = process.env.QA_URL || 'http://127.0.0.1:3000';
await mkdir(`outputs/${label}`, { recursive: true });
const browser = await chromium.launch({channel:'chrome', headless:true});
const results=[];
const sizes=[[1280,720],[1280,800],[1366,768],[1440,900],[1536,864],[1920,1080],[1366,600],[900,700],[901,700],[820,700],[821,700],[560,700],[561,700],[768,1024],[390,844],[360,640]];
for(const [width,height] of sizes){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 await page.goto(`${base}/terceirizacao`);
 const reject=page.getByRole('button',{name:/Rejeitar|Apenas necessários/i});
 if(await reject.count()) await reject.first().click();
 for(const name of ['Ideia','Fórmula','Produto']){
  if(label==='before') await page.getByRole('button',{name:new RegExp(name+'$')}).evaluate(b=>b.click()); else await page.getByRole('button',{name:new RegExp(name+'$')}).click();
  await page.waitForTimeout(650);
  const result=await page.evaluate(()=>{
   const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height};};
   const intro=rect('.outsourcing-scroll-hero-intro'),image=rect('.outsourcing-scroll-hero-slide[data-offset="0"] img'),message=rect('.outsourcing-scroll-hero-message'),hero=rect('.outsourcing-scroll-hero');
   const cue=document.querySelector('.outsourcing-scroll-hero-continuation');
   const visibleImages=[...document.querySelectorAll('.outsourcing-scroll-hero-slide')].filter(s=>getComputedStyle(s).opacity>0).map(s=>s.querySelector('img').getBoundingClientRect());
   return {stage:document.querySelector('.outsourcing-scroll-hero').dataset.activeStage,intro,image,message,hero,cue:cue?rect('.outsourcing-scroll-hero-continuation'):null,overlap:visibleImages.some(r=>r.bottom>message.top||r.top<intro.bottom),horizontalOverflow:document.documentElement.scrollWidth>innerWidth};
  });
  results.push({width,height,...result});
  if(name==='Produto'){
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.screenshot({path:`outputs/${label}/${width}x${height}.png`,fullPage:false});
  }
 }
 if(label!=='before'){
  await page.mouse.move(width/2,height/2);
  await page.mouse.wheel(0,400);
  await page.waitForTimeout(650);
  if(await page.evaluate(()=>scrollY)<=0) throw new Error(`Final stage trapped scrolling at ${width}x${height}`);
 }
 await page.close();
}
await writeFile(`outputs/${label}/layout.json`,JSON.stringify(results,null,2));
if(label!=='before'){
 const page=await browser.newPage({viewport:{width:1366,height:768},deviceScaleFactor:2,reducedMotion:'reduce'});
 await page.goto(`${base}/terceirizacao`);
 await page.getByRole('button',{name:/Produto$/}).click();
 const animation=await page.locator('.outsourcing-scroll-hero-continuation svg').evaluate(e=>getComputedStyle(e).animationName);
 if(animation!=='none')throw new Error('Reduced-motion cue must be static');
 await page.screenshot({path:`outputs/${label}/1366x768-dpr2-reduced.png`});
 await page.close();
}
console.log(JSON.stringify({cases:results.length,failures:results.filter(r=>r.overlap||r.horizontalOverflow),product:results.find(r=>r.width===1366&&r.stage==='product')},null,2));
await browser.close();
if(results.some(r=>r.overlap||r.horizontalOverflow))process.exitCode=1;



