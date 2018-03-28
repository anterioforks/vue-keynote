<template>
  <Keynote>
    <AuthorSlide 
      transition="twirl"
      photo="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" name="Author Name">
      Developer, Foo Company
    </AuthorSlide>

    <TitleSlide 
      transition="twirl"
      name="slide 2" title="A Bold Title">
      A little description about it.
      <CodePreview language="javascript">{{`
        export default {
          name: 'Example'
        }
      `}}</CodePreview>
    </TitleSlide>

    <PhotoTitleSlide transition="dissolve" name="slide 3" photo="https://unsplash.it/1200/800?random=1" title="An unsplash photo">
      There is a random unsplash photo at top.
    </PhotoTitleSlide>

    <TitleSlide transition="dissolve" name="slide 4" title="And I just put this slide here." />
    
    <PhotoTitleSlide name="slide 5" photo="https://unsplash.it/1200/800?random=2" title="A vertical photo" vertical>
      There is a random unsplash photo on right.
    </PhotoTitleSlide>

    <PhotoTitleSlide name="slide 6" photo="https://unsplash.it/1200/800?random=3" title="A vertical photo" vertical left>
      There is a random unsplash photo on left.
    </PhotoTitleSlide>

    <PhotoSlide photo="https://unsplash.it/1200/800?random=4"/>

    <Slide>
      <Title fit>Build: {{ text }}</Title>
      <Build name="first">
        <transition name="slide">
          <Type value="Hello World! The quick brown fox jumped over the lazy dog."/>
        </transition>
      </Build>

      <Build name="second" after="first" :delay="1000">
        <transition name="slide">
          <Type value="This should auto start in 500 miliseconds."/>
        </transition>
      </Build>

      <Build name="third" with="second">
        <transition name="slide">
          <Type value="This should auto start with above."/>
        </transition>
      </Build>
    </Slide>

    <Slide>
      <Heading :level="1">Hello World Again</Heading>
      <Build>
        <Photo src="//picsum.photos/200" />
      </Build>
      <Build>
        <transition name="slide">
          <Heading :level="2">Hello Vue Again</Heading>
        </transition>
      </Build>
    </Slide>
    
    <Slide>
      <Title fit caps>Hello World Again 2</Title>
      <Build>
        <transition name="slide">
          <Fit>Hello Vue Again 2</Fit>
        </transition>
      </Build>

    </Slide>
  </Keynote>
</template>


<script>
export default {
  name: 'SimpleExampleKeynote',
  theme: 'default',
  data: () => ({
    text: 'Hello Vue'
  }),
  methods: {
    after() {
      console.log('After.')
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 2s ease;
}
.slide-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
