import { type Prisma, type PrismaClient } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import slugify from 'slugify';

export async function generateUniqueSlug(
  name: string,
  ctx: {
    headers: Headers;
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  }
): Promise<string> {
  const baseSlug = slugify(name, { lower: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await ctx.db.board.findFirst({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}
