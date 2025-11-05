"use client";
import { cn } from "@/lib/utils";
import {
  IconSnowflake,
  IconFlame,
  IconTool,
  IconCheckbox,
  IconAlertCircle
} from "@tabler/icons-react";
import { HVAC_SERVICES } from "@/lib/service-descriptions";
import {
  getPrimaryColor,
  getSuccessColor,
  getColors,
} from "@/lib/template-config";

// Get colors from template
const primaryColor = getPrimaryColor();
const successColor = getSuccessColor();
const colors = getColors();

// HVAC services to display (using the service descriptions library)
const hvacServices = [
  {
    ...HVAC_SERVICES['AC Repair'],
    icon: <IconSnowflake className="h-8 w-8" style={{ color: colors.accent.cold.main }} stroke={1.5} />,
  },
  {
    ...HVAC_SERVICES['Heating Repair'],
    icon: <IconFlame className="h-8 w-8" style={{ color: colors.accent.hot.main }} stroke={1.5} />,
  },
  {
    ...HVAC_SERVICES['Installation'],
    icon: <IconTool className="h-8 w-8" style={{ color: primaryColor }} stroke={1.5} />,
  },
  {
    ...HVAC_SERVICES['Maintenance'],
    icon: <IconCheckbox className="h-8 w-8" style={{ color: successColor }} stroke={1.5} />,
  },
  {
    ...HVAC_SERVICES['Emergency Service'],
    icon: <IconAlertCircle className="h-8 w-8" style={{ color: colors.danger }} stroke={1.5} />,
  },
];

export const Services = () => {
  return (
    <div
      id="services"
      className="max-w-7xl mx-auto antialiased py-10 md:py-20"
    >
      <div className="mx-auto max-w-2xl sm:text-center pb-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground">
          Our HVAC Services
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          From emergency repairs to new installations, we keep your home comfortable year-round.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
        {hvacServices.map((service, index) => (
          <Feature key={service.title} {...service} index={index} />
        ))}
      </div>
    </div>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 transition-all duration-200 origin-center"
          style={{
            backgroundColor: 'var(--hover-accent, rgb(212 212 212))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = primaryColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--hover-accent, rgb(212 212 212))';
          }}
        />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
