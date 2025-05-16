import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert', () => {
  it('renders basic alert', () => {
    render(
      <Alert>
        <AlertTitle>提示</AlertTitle>
        <AlertDescription>这是一条提示信息</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('提示')).toBeInTheDocument();
    expect(screen.getByText('这是一条提示信息')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>错误</AlertTitle>
        <AlertDescription>发生了一个错误</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('text-red-500');
    expect(alert).toHaveClass('border-red-500/50');
  });

  it('applies custom className', () => {
    render(
      <Alert className="custom-alert">
        <AlertTitle>自定义样式</AlertTitle>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-alert');
  });

  it('renders title with custom className', () => {
    render(
      <AlertTitle className="custom-title">标题</AlertTitle>
    );

    const title = screen.getByText('标题');
    expect(title).toHaveClass('custom-title');
    expect(title).toHaveClass('mb-1', 'font-medium', 'leading-none', 'tracking-tight');
  });

  it('renders description with custom className', () => {
    render(
      <AlertDescription className="custom-description">描述</AlertDescription>
    );

    const description = screen.getByText('描述');
    expect(description).toHaveClass('custom-description');
    expect(description).toHaveClass('text-sm', '[&_p]:leading-relaxed');
  });
});
