import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByText('点击我')).toBeInTheDocument();
  });

  it('applies default variant classes correctly', () => {
    render(<Button variant="default">测试按钮</Button>);
    const button = screen.getByText('测试按钮');
    expect(button).toHaveClass('bg-zinc-900', 'text-zinc-50');
  });

  it('applies different sizes correctly', () => {
    render(<Button size="lg">大按钮</Button>);
    const button = screen.getByText('大按钮');
    expect(button).toHaveClass('h-10', 'rounded-md', 'px-8');
  });

  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#">链接按钮</a>
      </Button>
    );
    const link = screen.getByText('链接按钮');
    expect(link.tagName.toLowerCase()).toBe('a');
  });
});
