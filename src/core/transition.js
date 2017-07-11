export function extract (slide) {
  if (!slide) return {}

  return { name: 'slide-fade' }
}

export default function (h, current) {
  return h(
    'transition',
    { props: extract(current) },
    [current]
  )
}

export function filterSlides (slides) {
  if (!Array.isArray(slides)) return []

  return slides.filter(slide => slide.tag)
}
