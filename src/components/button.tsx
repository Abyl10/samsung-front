import { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'text-white h-[70px]',
        secondary:
          'h-[70px] bg-[#E6EECA] text-[#A98055] text-base w-40 rounded-2xl hover:outline-none hover:bg-[#A98055] hover:text-[#E6EECA] hover:shadow-md focus:border-[#A98055]',
      },
      defaultVariants: {
        variant: 'primary',
      },
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  }
);

export default Button;
