import { Todo } from '@prisma/client';
import { GetServerSideProps, GetStaticProps } from 'next';
import useSWR from 'swr';

// import prisma from '@/utils/db';

// export const getStaticProps: GetStaticProps<{
// 	todos: Partial<Todo>[];
// }> = async () => {
// 	const todos = await prisma.todo.findMany({ select: { name: true } });

// 	return {
// 		props: { todos },
// 	};
// };

export default function Home(props) {
	const { data } = useSWR('/api/todo', (url) =>
		fetch(url).then((res) => res.json()),
	);
	return (
		<div className="bg-red-300">
			<p className="text-base">Hello</p>
			{/* {data && data.body?.map((a) => a.name)} */}
			{JSON.stringify(props.todos)}
			{JSON.stringify(data)}
		</div>
	);
}
