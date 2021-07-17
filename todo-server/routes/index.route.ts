import { Router } from 'https://deno.land/x/oak@v7.7.0/router.ts';

export async function addRoutes(router: any) {
	for await (const directory of Deno.readDir('./routes')) {
		if (directory.isFile) continue;
		for await (const dirEntry of Deno.readDir('./routes/' + directory.name)) {
			if (dirEntry.isFile && dirEntry.name.endsWith('.route.ts')) {
				const finalPath = './' + directory.name + '/' + dirEntry.name;
				const commandClass: any = await import(finalPath);
				commandClass.default('/' + directory.name.toLowerCase(), router);
			}
		}
	}
}