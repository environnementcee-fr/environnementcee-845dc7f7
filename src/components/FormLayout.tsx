import { ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; path?: string }>;
  children: ReactNode;
}

export const FormLayout = ({ title, subtitle, breadcrumbs, children }: FormLayoutProps) => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {breadcrumbs && (
          <nav className="mb-6 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 && " / "}
                {crumb.path ? (
                  <a href={crumb.path} className="hover:text-foreground">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};
