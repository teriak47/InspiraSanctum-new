import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-4">
          <div className="bg-[#151923]/50 backdrop-blur-sm rounded-xl p-8 border border-[#1E2330] max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-scarlet mb-4">Une erreur est survenue</h2>
            <p className="text-silver/70 mb-6">
              {this.state.error?.message || "L'application a rencontré une erreur inattendue."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#0A0F1C] text-silver/70 rounded-md hover:bg-[#1E2330] transition-colors"
            >
              Recharger l'application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}