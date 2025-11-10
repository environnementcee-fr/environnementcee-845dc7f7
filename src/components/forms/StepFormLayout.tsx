import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FormLayoutProps {
  title: string;
  description?: string;
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  children: ReactNode;
  heroImage?: string;
}

export const StepFormLayout = ({
  title,
  description,
  currentStep,
  totalSteps,
  stepLabels,
  children,
  heroImage,
}: FormLayoutProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {heroImage && (
        <div className="w-full h-48 md:h-64 relative overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
            {description && (
              <CardDescription className="text-base">{description}</CardDescription>
            )}
            
            <div className="space-y-4 pt-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                {stepLabels.map((label, index) => (
                  <div
                    key={index}
                    className={`flex-1 text-center ${
                      index + 1 === currentStep
                        ? "text-primary font-semibold"
                        : index + 1 < currentStep
                        ? "text-green-600"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          index + 1 === currentStep
                            ? "bg-primary text-primary-foreground border-primary"
                            : index + 1 < currentStep
                            ? "bg-green-600 text-white border-green-600"
                            : "border-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="hidden md:block">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
};
