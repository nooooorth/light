import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';

describe('Card', () => {
  it('renders basic card with content', () => {
    render(
      <Card>
        <CardContent>测试内容</CardContent>
      </Card>
    );
    expect(screen.getByText('测试内容')).toBeInTheDocument();
  });

  it('renders full card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>标题</CardTitle>
          <CardDescription>描述文本</CardDescription>
        </CardHeader>
        <CardContent>主要内容</CardContent>
        <CardFooter>底部内容</CardFooter>
      </Card>
    );

    expect(screen.getByText('标题')).toBeInTheDocument();
    expect(screen.getByText('描述文本')).toBeInTheDocument();
    expect(screen.getByText('主要内容')).toBeInTheDocument();
    expect(screen.getByText('底部内容')).toBeInTheDocument();
  });

  it('applies custom className to card', () => {
    render(
      <Card className="custom-class">
        <CardContent>内容</CardContent>
      </Card>
    );
    
    const card = screen.getByText('内容').closest('.custom-class');
    expect(card).toBeInTheDocument();
  });
});
