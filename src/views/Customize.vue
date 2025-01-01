<template>
  <div class="customize">
    <div class="stars-container">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div v-for="n in 20" :key="n" class="shooting-star"
           :style="{
             '--delay': `${Math.random() * 10}s`,
             '--top': `${Math.random() * 100}%`,
             '--left': `${Math.random() * 100}%`
           }">
      </div>
    </div>

    <div class="content glass-effect">
      <div class="mobile-container">
        <!-- 顶部文字区域 -->
        <div class="header-section">
          <h2 class="title">新年祝福</h2>
          <p class="subtitle">写下你的新年愿望，与好友碰杯</p>
        </div>

        <!-- 酒杯展示区域 -->
        <div class="glass-container">
          <div class="message-display" v-if="message">
            <div class="message-text">{{ message }}</div>
          </div>
          <div class="glass">
            <div class="glass-content">
              <div class="emoji-glass" :class="{ 'cheers': isDetecting }" @click="randomizeGlass">
                <span class="wine-glass">{{ selectedGlass }}</span>
                <transition name="fade">
                  <span class="cheers-glass" v-if="isDetecting">🍻</span>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部输入区域 -->
        <div class="bottom-section">
          <div class="input-section glass-effect">
            <input 
              v-model="message" 
              placeholder="写下你的新年愿望..."
              maxlength="20"
              @input="saveMessage"
              class="glass-input"
            >
            <div class="input-counter" :class="{ 'warning': message.length >= 15 }">
              {{ message.length }}/20
            </div>
          </div>

          <button @click="startDetection" class="start-btn glass-effect">
            开始碰杯
            <div class="btn-icon">🎉</div>
          </button>

          <input type="file" id="photo-upload" @change="handlePhotoUpload" style="display: none;">
          <button @click="$refs.photoUpload.click()" class="upload-btn glass-effect">
            上传照片
            <div class="btn-icon">📸</div>
          </button>
          <button v-if="selectedPhoto" @click="removePhoto" class="remove-btn glass-effect">
            移除照片
            <div class="btn-icon">❌</div>
          </button>
          <img v-if="selectedPhoto" :src="selectedPhoto" alt="上传的照片" class="uploaded-photo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Customize',
  data() {
    return {
      message: '',
      isDetecting: false,
      glassEmojis: ['🍺', '🥃', '🍷', '🥛', '🥤', '☕️'],
      selectedGlass: '🍷',
      selectedPhoto: null
    }
  },
  methods: {
    saveMessage() {
      localStorage.setItem('toastMessage', this.message);
    },
    startDetection() {
      this.isDetecting = true;
    },
    randomizeGlass() {
      const randomIndex = Math.floor(Math.random() * this.glassEmojis.length);
      this.selectedGlass = this.glassEmojis[randomIndex];
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removePhoto() {
      this.selectedPhoto = null;
      // 清空input的value，这样同一张图片可以重复上传
      const input = document.getElementById('photo-upload');
      if (input) input.value = '';
    }
  },
  mounted() {
    const savedMessage = localStorage.getItem('toastMessage');
    if (savedMessage) {
      this.message = savedMessage;
    }
    this.randomizeGlass();
  }
}
</script>

<style scoped>
.customize {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-space-purple), #461666);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.content {
  background: var(--glass-background);
  border-radius: 2rem;
  padding: 2rem 1.5rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  height: calc(100vh - 2rem);
  max-height: 800px;
  overflow: hidden;
}

.mobile-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.8rem;
  color: var(--color-cotton-white);
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.glass-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 0;
}

.message-display {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  text-align: center;
  animation: messageFloat 0.5s ease-out;
}

.message-text {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  color: var(--color-cotton-white);
  font-size: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  word-break: break-word;
}

.bottom-section {
  margin-top: auto;
  padding-top: 1rem;
}

.input-section {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
}

.glass-input {
  width: 100%;
  padding: 1.2rem;
  padding-right: 3.5rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 1rem;
  color: var(--color-cotton-white);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.start-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-cotton-white);
  padding: 1.2rem;
  font-size: 1.1rem;
  border-radius: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.start-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.15);
}

.upload-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-cotton-white);
  padding: 1.2rem;
  font-size: 1.1rem;
  border-radius: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.upload-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.15);
}

.remove-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-cotton-white);
  padding: 1.2rem;
  font-size: 1.1rem;
  border-radius: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.remove-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.15);
}

.btn-icon {
  font-size: 1.2rem;
}

.emoji-glass {
  font-size: 5rem;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.emoji-glass:active {
  transform: scale(0.95);
}

.uploaded-photo {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
  margin-top: 1rem;
}

/* 适配不同屏幕尺寸 */
@media (max-height: 667px) {
  .content {
    padding: 1.5rem 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .emoji-glass {
    font-size: 4rem;
  }

  .glass-input, .start-btn {
    padding: 1rem;
  }
}

@media (min-width: 768px) {
  .content {
    padding: 2.5rem;
  }

  .emoji-glass {
    font-size: 6rem;
  }

  .glass-input, .start-btn {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
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
  background: #000 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQBAMAAABykSv/AAAAG1BMVEUAAAD///8fHx8/Pz9fX1+fn5+/v7/f39////9+KQx4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEWklEQVR4nO3cwW3bQBBAUaWwAheQElKCS0gJKsEluASXkBLUgdlFgDgRvA7nz9sC7wHrxYzEj8UuV1dERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERET0r7phHIZ+dZhh7If7Yh/60e1qeXQ/jBm2w9dBeL0afxjdd1NmvxkzHzbtg/vV+Ll0w5gNm+6HzP4wZr0afxddP2bDpnEzZr0af7vFkOVmHH8aMVyPX4yYb0Y/ZNmK62bcD5ltxXQzDvfFTrTD52aMh+FzHx6+jF8M2X0Z3w1fxo/D5z7spvHj5+Pr+P5+/GpIe//X+P3n4/P44cv4xZD+fvx8P34ev/88fh4/fB4/Dx+/Hd8PY8avh/TT+P3n8dP4+cv4afhwP34xZJjGr8evxs/j5/Hz+Hn8PH4ePt6P78cxq/Hz+Hn8PH4ev/jvh/F+/GY1fh4/j5/Hz+MXQ7b34zfr8fP4efw8fh6/GLK7H79Zj5/Hz+Pn8fP4xZDd/fjNevw8fh4/j5/HL4Zs78dv1uPn8fP4efw8fjHk8378Zj1+Hj+Pn8fP4xdDpvvxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hj+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hj+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hj+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j18Mme7Hb9bj5/Hz+Hn8PH4x5OV+/GY9fh4/j5/Hz+MXQ6b78Zv1+Hj+Pn8fP4xZDpfvxmPX4eP4+fx8/jF0Ne7sdv1uPn8fP4efw8fjFkuh+/WY+fx8/j5/Hz+MWQl/vxm/X4efw8fh4/j5+IiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiOif9BvR4eYK2EwKQQAAAABJRU5ErkJggg==");
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
  width: 50px;
  height: 50px;
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
  width: 30px;
  height: 30px;
  top: 10px;
  left: 10px;
}

.cloud:after {
  width: 50px;
  height: 50px;
  top: 0;
  left: 0;
}

.top-left {
  top: -25px;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.top-right {
  top: -25px;
  right: 10%;
  animation: float 6s ease-in-out infinite;
  animation-delay: -2s;
}

.bottom-left {
  bottom: -25px;
  left: 10%;
  animation: float 6s ease-in-out infinite;
  animation-delay: -4s;
}

.bottom-right {
  bottom: -25px;
  right: 10%;
  animation: float 6s ease-in-out infinite;
  animation-delay: -6s;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes messageFloat {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
