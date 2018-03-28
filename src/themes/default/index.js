export default function Default(Keynote) {
  Keynote.slides({
    Slide: () => import('./Slide.vue'),
    AuthorSlide: () => import('./AuthorSlide.vue'),
    PhotoSlide: () => import('./PhotoSlide.vue'),
    PhotoTitleSlide: () => import('./PhotoTitleSlide.vue'),
    TitleSlide: () => import('./TitleSlide.vue')
  })
}
