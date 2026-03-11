import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { PostService } from "./post.service";
import { productImageStorage } from "src/infra/multer/multer";

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(
    FilesInterceptor('images', 5, { storage: productImageStorage })
  )
  @Post('createpost/:id')
  createPost(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFiles() files?: Express.Multer.File[], 
  ) {

    return this.postService.createPost(id, data, files);
  }

  @Get('getPost')
  getPost(){
    return this.postService.getPost();
  }

  @Patch('like/:id')
  addLike(@Param() id: any, @Body() userId: any){
    return this.postService.toggleLike(id, userId);
  }

  @Patch('comment/:id')
  addComment(@Param() id: string, @Body() data: any){
    return this.postService.addComment(id, data);
  }

  @Get('like/total/:id')
  getTotalLikes(@Param() id: string){
    return this.postService.getTotalLikes(id);
  }

  @Get('comment/total/:id')
  getTotalComments(@Param() id: string){
    return this.postService.getTotalComments(id);
  }

  @Get('postComment/:id')
  getComments(@Param() id: string){
  return this.postService.getComments(id); 
  }
}