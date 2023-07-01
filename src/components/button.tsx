import { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary:
          'text-white h-[70px] bg-[#F9DAA7] rounded-[30px] text-[#695846] text-lg font-normal cursor-pointer flex flex-row items-center gap-4 hover:outline-none hover:bg-[#695846] hover:text-[#F9DAA7] hover:shadow-md focus:border-[#695846]',
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
