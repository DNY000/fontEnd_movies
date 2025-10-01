import React from 'react';
import { AlertCircle, AlertTriangle, Info, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
  onRetry?: () => void;
  severity?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = 'Error',
  onRetry,
  severity = 'error'
}) => {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: AlertTriangle,
          iconColor: 'text-yellow-600'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: Info,
          iconColor: 'text-blue-600'
        };
      default:
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: AlertCircle,
          iconColor: 'text-red-600'
        };
    }
  };

  const { container, icon: Icon, iconColor } = getSeverityStyles();

  return (
    <div className="my-4">
      <div className={`border rounded-lg p-4 ${container}`}>
        <div className="flex items-start">
          <Icon className={`h-5 w-5 mr-3 mt-0.5 ${iconColor}`} />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm">{message}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="ml-4 flex items-center px-3 py-1 text-sm font-medium rounded-md hover:bg-white/50 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Thử lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
