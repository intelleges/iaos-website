import { CheckCircle2, Mail, MousePointerClick, AlertTriangle, Ban, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type EmailHealthStatus = "delivered" | "opened" | "clicked" | "bounced" | "spam" | "unsubscribed" | "suppressed";

export interface EmailHealthBadgeProps {
  status: EmailHealthStatus;
  count?: number;
  timestamp?: Date | string;
  reason?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig: Record<EmailHealthStatus, {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  bgColor: string;
  description: string;
}> = {
  delivered: {
    icon: CheckCircle2,
    label: "Delivered",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Email successfully delivered to recipient's inbox",
  },
  opened: {
    icon: Mail,
    label: "Opened",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Recipient opened the email",
  },
  clicked: {
    icon: MousePointerClick,
    label: "Clicked",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Recipient clicked a link in the email",
  },
  bounced: {
    icon: AlertTriangle,
    label: "Bounced",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Email bounced (invalid address or mailbox full)",
  },
  spam: {
    icon: Ban,
    label: "Spam Report",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Recipient marked email as spam",
  },
  unsubscribed: {
    icon: XCircle,
    label: "Unsubscribed",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    description: "Recipient unsubscribed from emails",
  },
  suppressed: {
    icon: Ban,
    label: "Suppressed",
    color: "text-red-700",
    bgColor: "bg-red-100",
    description: "Email address is blocked from receiving communications",
  },
};

const sizeConfig = {
  sm: {
    icon: "h-3 w-3",
    badge: "px-1.5 py-0.5 text-xs",
    gap: "gap-1",
  },
  md: {
    icon: "h-4 w-4",
    badge: "px-2 py-1 text-sm",
    gap: "gap-1.5",
  },
  lg: {
    icon: "h-5 w-5",
    badge: "px-3 py-1.5 text-base",
    gap: "gap-2",
  },
};

export default function EmailHealthBadge({
  status,
  count,
  timestamp,
  reason,
  showLabel = false,
  size = "md",
}: EmailHealthBadgeProps) {
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  const formatTimestamp = (ts: Date | string) => {
    const date = typeof ts === "string" ? new Date(ts) : ts;
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const tooltipContent = (
    <div className="space-y-1">
      <div className="font-semibold">{config.label}</div>
      <div className="text-xs text-gray-300">{config.description}</div>
      {count !== undefined && count > 1 && (
        <div className="text-xs text-gray-300">Count: {count}</div>
      )}
      {timestamp && (
        <div className="text-xs text-gray-300">
          {formatTimestamp(timestamp)}
        </div>
      )}
      {reason && (
        <div className="text-xs text-gray-300">
          Reason: {reason}
        </div>
      )}
    </div>
  );

  const badge = (
    <div
      className={`inline-flex items-center ${sizeStyles.gap} ${sizeStyles.badge} ${config.bgColor} ${config.color} rounded-full font-medium`}
    >
      <Icon className={sizeStyles.icon} />
      {showLabel && <span>{config.label}</span>}
      {count !== undefined && count > 1 && <span>×{count}</span>}
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * EmailHealthBadgeGroup - Display multiple badges in a row
 */
export interface EmailHealthBadgeGroupProps {
  statuses: Array<{
    status: EmailHealthStatus;
    count?: number;
    timestamp?: Date | string;
    reason?: string;
  }>;
  size?: "sm" | "md" | "lg";
  maxVisible?: number;
}

export function EmailHealthBadgeGroup({
  statuses,
  size = "sm",
  maxVisible = 5,
}: EmailHealthBadgeGroupProps) {
  const visibleStatuses = statuses.slice(0, maxVisible);
  const hiddenCount = statuses.length - maxVisible;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visibleStatuses.map((item, index) => (
        <EmailHealthBadge
          key={`${item.status}-${index}`}
          status={item.status}
          count={item.count}
          timestamp={item.timestamp}
          reason={item.reason}
          size={size}
        />
      ))}
      {hiddenCount > 0 && (
        <span className="text-xs text-gray-500 ml-1">
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
}
