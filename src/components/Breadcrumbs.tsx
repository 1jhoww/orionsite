import { Link } from "react-router-dom";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="container breadcrumbs" aria-label="Trilha de navegação">
      <ol>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? <Link to={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
