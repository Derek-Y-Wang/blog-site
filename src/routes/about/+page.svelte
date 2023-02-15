<script>
  import Header from '../../components/Header.svelte'
</script>

<body>
  <Header />
  <header> 
    <h2>About Me</h2>
  </header>
  <h1>Hey there!</h1>
  <p>
    My name is Derek and I am a software engineer originally from Toronto, Canada. I have 
    attended the University of Toronto for CS between 2018-2023 and I enjoy taking the time to 
    learn new things. I created this website with the goal of documenting things I have learned 
    or created during my free time. Feel free to connect with me on <a href="https://www.linkedin.com/in/derek-y-wang/">LinkedIn.</a>
  </p>
</body>

<style> 
  body {
    max-width: 42rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  p {
    font-size: 18px;
  }

  h1 {
    padding-top: 15px;
  }
</style>