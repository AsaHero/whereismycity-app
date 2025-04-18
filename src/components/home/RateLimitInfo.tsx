import React from "react";
import { useSearch } from "../../context/SearchContext";
import { useTranslation } from "../../context/TranslationContext";
import { AlertTriangle, Info } from "lucide-react";

export const RateLimitInfo = () => {
  const { t } = useTranslation();
  const { rateLimitInfo } = useSearch();

  if (!rateLimitInfo) {
    return null;
  }

  const limit = parseInt(rateLimitInfo.limit) || 0;
  const remaining = parseInt(rateLimitInfo.remaining) || 0;
  const usagePercentage = limit > 0 ? ((limit - remaining) / limit) * 100 : 0;

  // Format reset time (Unix timestamp)
  const resetTime = new Date(rateLimitInfo.reset * 1000);
  const now = new Date();
  const minutesUntilReset = Math.ceil((resetTime - now) / (60 * 1000));

  const getBarColor = () => {
    if (usagePercentage > 90) return "bg-red-500";
    if (usagePercentage > 70) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-4 rounded-lg border border-gray-200 p-3 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Info className="h-4 w-4 text-gray-500 mr-2" />
          <h4 className="text-sm font-medium text-gray-700">
            {t("demo.apiRateLimit")}
          </h4>
        </div>
        {remaining < limit * 0.1 && (
          <div className="flex items-center text-red-600 text-xs font-medium">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {t("demo.rateLimitWarning")}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-gray-500">
          {remaining} / {limit} {t("demo.requestsRemaining")}
        </div>
        <div className="text-xs text-gray-500">
          {minutesUntilReset <= 0
            ? t("demo.resetsNow")
            : t("demo.resetsIn", { minutes: minutesUntilReset })}
        </div>
      </div>

      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor()} transition-all duration-300 ease-in-out`}
          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};
