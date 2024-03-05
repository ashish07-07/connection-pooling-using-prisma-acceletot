// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

// export interface Env {
// 	DATABASE_URL: string;
// }

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		const prisma = new PrismaClient({
// 			datasourceUrl: env.DATABASE_URL,
// 		}).$extends(withAccelerate());

// 		await prisma.log.create({
// 			data: {
// 				level: 'Info',
// 				message: `${request.method} ${request.url}`,
// 				meta: {
// 					headers: JSON.stringify(request.headers),
// 				},
// 			},
// 		});

// 		const { data, info } = await prisma.log
// 			.findMany({
// 				take: 20,
// 				orderBy: {
// 					id: 'desc',
// 				},
// 			})
// 			.withAccelerateInfo();

// 		console.log(JSON.stringify(info));

// 		return new Response(`request method: ${request.method}!`);
// 	},
// };
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL,
		}).$extends(withAccelerate());

		const res = await prisma.log.create({
			data: {
				level: 'Info',
				message: `${request.method} ${request.url}`,
				meta: {
					headers: JSON.stringify(request.headers),
				},
			},
		});

		console.log(JSON.stringify(request.headers));

		return Response.json(res);

		// const { data, info } = await prisma.log
		// 	.findMany({
		// 		take: 20,
		// 		orderBy: {
		// 			id: 'desc',
		// 		},
		// 	})
		// 	.withAccelerateInfo();

		// console.log(JSON.stringify(info));

		return new Response(`request method: ${request.method}!`);
	},
};
// export interface Env {}

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// };
