<template>
  <div class="home">
    <div class="stars-container">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="clouds"></div>
      <div v-for="n in 20" :key="n" class="shooting-star"
           :style="{
             '--delay': `${Math.random() * 10}s`,
             '--top': `${Math.random() * 100}%`,
             '--left': `${Math.random() * 100}%`
           }">
      </div>
    </div>
    
    <div class="welcome-container glass-effect">
      <div class="cloud-wrapper top-left">
        <div class="cloud"></div>
      </div>
      
      <h1>新年碰杯</h1>
      <p>让我们在星空下共同庆祝</p>
      
      <router-link to="/customize" class="enter-btn glass-effect">
        开始碰杯
        <div class="cloud-wrapper btn-cloud">
          <div class="cloud"></div>
        </div>
      </router-link>
      
      <div class="cloud-wrapper bottom-right">
        <div class="cloud"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
@import '../assets/styles/variables.css';

.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--color-space-purple), #461666);
  color: var(--color-cotton-white);
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 星空背景 */
.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQBAMAAABykSv/AAAAG1BMVEUAAAD///8fHx8/Pz9fX1+fn5+/v7/f39////9+KQx4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEWklEQVR4nO3cwW3bQBBAUaWwAheQElKCS0gJKsEluASXkBLUgdlFgDgRvA7nz9sC7wHrxYzEj8UuV1dERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERET0r7phHIZ+dZhh7If7Yh/60e1qeXQ/jBm2w9dBeL0afxjdd1NmvxkzHzbtg/vV+Ll0w5gNm+6HzP4wZr0afxddP2bDpnEzZr0af7vFkOVmHH8aMVyPX4yYb0Y/ZNmK62bcD5ltxXQzDvfFTrTD52aMh+FzHx6+jF8M2X0Z3w1fxo/D5z7spvHj5+Pr+P5+/GpIe//X+P3n4/P44cv4xZD+fvx8P34ev/88fh4/fB4/Dx+/Hd8PY8avh/TT+P3n8dP4+cv4afhwP34xZJjGr8evxs/j5/Hz+Hn8PH4ePt6P78cxq/Hz+Hn8PH4ev/jvh/F+/GY1fh4/j5/Hz+MXQ7b34zfr8fP4efw8fh6/GLK7H79Zj5/Hz+Pn8fP4xZDd/fjNevw8fh4/j5/HL4Zs78dv1uPn8fP4efw8fjHk8378Zj1+Hj+Pn8fP4xdDpvvxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hn8PH4eP49fDHm5H79Zj5/Hz+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hn8PH4eP49fDHm5H79Zj5/Hz+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hn8PH4eP49fDHm5H79Zj5/Hz+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hn8PH4eP49fDHm5H79Zj5/Hz+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j5+IiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiOif9BvR4eYK2EwKQQAAAABJRU5ErkJggg==");
}

.twinkling {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  animation: twinkle 200s linear infinite;
}

@keyframes twinkle {
  from { background-position: 0 0; }
  to { background-position: -10000px 5000px; }
}

/* 流星效果 */
.shooting-star {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
  transform: rotate(-45deg);
  animation: shooting 3s linear infinite;
  animation-delay: var(--delay);
  top: var(--top);
  left: var(--left);
}

@keyframes shooting {
  0% {
    transform: translateX(0) translateY(0) rotate(-45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(500px) translateY(500px) rotate(-45deg);
    opacity: 0;
  }
}

/* 云朵效果 */
.cloud-wrapper {
  position: absolute;
  width: 60px;
  height: 60px;
}

.cloud {
  position: relative;
  width: 100%;
  height: 100%;
}

.cloud:before,
.cloud:after {
  content: '';
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.cloud:before {
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
}

.cloud:after {
  width: 60px;
  height: 60px;
  top: 0;
  left: 0;
}

.top-left {
  top: -30px;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.bottom-right {
  bottom: -30px;
  right: 10%;
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.welcome-container {
  padding: 3rem;
  border-radius: 2rem;
  position: relative;
  z-index: 1;
  max-width: 80%;
  margin: 2rem;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--color-cloud-gold), var(--color-dream-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--color-cotton-white);
}

.enter-btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  color: var(--color-cotton-white);
  text-decoration: none;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal) ease;
}

.enter-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-cloud {
  width: 30px;
  height: 30px;
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  animation: float 6s ease-in-out infinite;
  animation-delay: -1.5s;
}

@media (max-width: 768px) {
  .welcome-container {
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.2rem;
  }

  .cloud-wrapper {
    width: 40px;
    height: 40px;
  }
}
</style>
