import Link from "next/link";
import { IPost } from "@/entities/models";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui";

export const PostCard = ({ post }: { post: IPost }) => (
  <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
    <CardHeader>
      <CardTitle className="line-clamp-2 text-xl capitalize leading-snug">
        {post.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="grow">
      <p className="text-muted-foreground line-clamp-3">
        {post.body}
      </p>
    </CardContent>
    <CardFooter>
      <Button asChild variant="outline" className="w-full">
        <Link href={`/posts/${post.id}`}>
          Подробнее
        </Link>
      </Button>
    </CardFooter>
  </Card>
);