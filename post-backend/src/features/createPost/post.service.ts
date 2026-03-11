import { Injectable, NotFoundException } from "@nestjs/common";
import { Comment } from "src/domain/comment.entity";
import { Like } from "src/domain/like.entity";
import { Post } from "src/domain/post.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PostService {
    constructor(private readonly dataSource: DataSource) { }

    async createPost(id: string, data: any, files: Express.Multer.File[]) {
        const postRepo = this.dataSource.getRepository(Post);
        console.log(files);

        const imageUrls = files?.map(
            (file) => `http://localhost:3002/uploads/${file.filename}`
        ) || [];

        const post = postRepo.create({
            image: imageUrls.length > 0 ? imageUrls : null,
            text: data.text,
            userId: id
        });
        await postRepo.save(post);
        return { message: 'Post created successfully' };
    }

    async getPost() {
        const postRepo = this.dataSource.getRepository(Post);
        const post = await postRepo.find();
        return post;
    }

    async toggleLike(postId: any, userId: any) {
        const likeRepo = this.dataSource.getRepository(Like);
        const postRepo = this.dataSource.getRepository(Post);

        const post = await postRepo.findOne({ where: { id: postId.id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const existingLike = await likeRepo.findOne({
            where: { post:{id: postId.id}, userId },
        });

        if (existingLike) {
            await likeRepo.remove(existingLike);
            return { message: 'Like removed', liked: false };
        }

        const like = likeRepo.create({
            userId,
            post,
        });
        await likeRepo.save(like);

        return { message: 'Post liked', liked: true };
    }

    async addComment(id: any, data: any) {
        const commentRepo = this.dataSource.getRepository(Comment);
        const postRepo = this.dataSource.getRepository(Post);
        const post = await postRepo.findOne({ where: { id: id.id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const comment = commentRepo.create({
            userId: data.data.userId,
            comment: data.data.text,
            post,
            parentId: data.data.parentId ?? null,
        })

        await commentRepo.save(comment);
        return {message:'Added Comment'};
    }

    async getTotalLikes(id: any) {
        const postRepo = this.dataSource.getRepository(Post);
        const post = await postRepo.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const likeRepo = this.dataSource.getRepository(Like);
        const total = await likeRepo.count({
            where: { post: { id: id } }
        })
        return total;
    }

    async getTotalComments(id: any) {
        const postRepo = this.dataSource.getRepository(Post);
        const post = await postRepo.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const commentRepo = this.dataSource.getRepository(Comment);
        const total = await commentRepo.count({
            where: { post: { id: id } }
        })
        return total;
    }

    async getComments(id: any){
        const postRepo = this.dataSource.getRepository(Post);
        const post = await postRepo.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const commentRepo = this.dataSource.getRepository(Comment);
        const total = await commentRepo.find({
            where: { post: { id: id } }
        })
        return total;
    }
}
