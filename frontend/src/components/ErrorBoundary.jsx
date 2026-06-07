import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log to console for debugging
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-700 mb-4">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            
            {import.meta.env.DEV && (
              <details className="mb-4 p-4 bg-red-50 rounded border border-red-200">
                <summary className="cursor-pointer font-semibold text-red-800">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-xs text-red-700 overflow-auto max-h-40">
                  {this.state.error && this.state.error.toString()}
                  {'\n'}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex gap-4">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                Try Again
              </button>
              <a
                href="/"
                className="flex-1 bg-gray-600 text-white py-2 rounded font-semibold text-center hover:bg-gray-700 transition"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
