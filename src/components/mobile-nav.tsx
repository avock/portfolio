'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { usePathname } from 'next/navigation';

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant='outline' className='w-10 px-0 sm:hidden'>
					<Menu className='h-5 w-5' />
					<span className='sr-only'>Toggle Theme</span>
				</Button>
			</SheetTrigger>
			<SheetContent side='right'>
				<MobileLink
					onOpenChange={setOpen}
					href='/'
					className='flex items-center'>
					{/* <Icons.logo className='mr-2 h-4 w-4' /> */}
					<span className='font-bold'>{siteConfig.name}</span>
				</MobileLink>
				<div className='flex flex-col gap-3 mt-3'>
					<MobileLink onOpenChange={setOpen} href='/experience'>
						Experience
					</MobileLink>
					<MobileLink onOpenChange={setOpen} href='/coffee'>
						Coffee
					</MobileLink>
					<MobileLink onOpenChange={setOpen} href='/blog'>
						Blog
					</MobileLink>
					<MobileLink onOpenChange={setOpen} href='/photography'>
						Photography
					</MobileLink>
					{/* <Link
						target='_blank'
						rel='noreferrer'
						href={siteConfig.socials.github}>
						GitHub
					</Link> */}
				</div>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends LinkProps {
	children: React.ReactNode;
	onOpenChange?: (open: boolean) => void;
	className?: string;
}

function MobileLink({
	href,
	onOpenChange,
	children,
	className,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={className}
			{...props}>
			{children}
		</Link>
	);
}
