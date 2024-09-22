import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface BlogCardProps {
    slug: string, 
    date: string
    title: string,
    description: string,
}

export function BlogCard({ slug, date, title, description} : BlogCardProps ) {
    return (
		<article className='flex flex-col gap-2 border-border border-b py-3'>
			<div>
				<h2 className='text-lg sm:text-2xl font-bold'>
					<Link href={slug}>{title}</Link>
				</h2>
			</div>
			<div className='max-w-none text-muted-foreground text-sm sm:text-base'>
				{description}
			</div>
			<div className='flex justify-between items-center'>
				<dl>
					<dt className='sr-only'>Published on</dt>
					<dd className='text-xs sm:text-base font-medium flex items-center gap-1'>
						<Calendar className='w-4 h-4' />
						<time dateTime={date}>{formatDate(date)}</time>
					</dd>
				</dl>
				<Link
					href={slug}
					className={cn(
						buttonVariants({ variant: 'link' }),
						'py-0 text-xs sm:text-base'
					)}>
					Read more →
				</Link>
			</div>
		</article>
	);
}