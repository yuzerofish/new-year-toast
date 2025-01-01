<template>
  <div class="customize-container">
    <!-- 顶部预览区域 -->
    <div class="preview-section glass-effect">
      <div v-if="selectedPhoto" class="photo-preview">
        <img :src="selectedPhoto" alt="碰杯照片" class="preview-img">
        <div class="preview-overlay glass-effect">
          <button class="action-btn remove-btn" @click="removePhoto">
            <span class="icon">×</span>
          </button>
        </div>
      </div>
      <div v-else class="empty-preview">
        <div class="empty-icon">🖼️</div>
        <div class="empty-text">添加你的碰杯照片</div>
      </div>
    </div>

    <!-- 底部操作区域 -->
    <div class="action-section glass-effect">
      <div class="action-content">
        <!-- 消息输入区 -->
        <div class="message-input glass-effect">
          <input
            v-model="message"
            type="text"
            placeholder="输入祝福语..."
            class="custom-input"
          >
          <div class="emoji-glass">{{ selectedGlass }}</div>
          <button class="action-btn" @click="randomizeGlass">
            <span class="icon">🎲</span>
          </button>
        </div>

        <!-- 照片上传区 -->
        <div class="upload-section">
          <label for="photoUpload" class="upload-btn glass-effect">
            <span class="icon">📸</span>
            <span class="btn-text">{{ selectedPhoto ? '更换照片' : '上传照片' }}</span>
          </label>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            class="hidden-input"
            @change="handlePhotoUpload"
          >
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
      console.log('File input change event triggered');
      const file = event.target.files?.[0];
      if (!file) {
        console.log('No file selected');
        return;
      }

      console.log('Selected file:', file.name, file.type);

      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File loaded successfully');
        this.selectedPhoto = e.target.result;
      };
      reader.onerror = () => {
        console.error('Error reading file');
        alert('读取文件失败，请重试');
      };
      reader.readAsDataURL(file);
    },

    removePhoto() {
      this.selectedPhoto = null;
      const input = document.getElementById('photoUpload');
      if (input) {
        input.value = '';
      }
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
.customize-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  overflow: hidden;
}

/* 预览区域样式 */
.preview-section {
  flex: 7;
  position: relative;
  margin: 1rem;
  border-radius: 1.5rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  font-size: 4rem;
  opacity: 0.5;
}

.empty-text {
  font-size: 1.2rem;
}

.photo-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

/* 底部操作区域样式 */
.action-section {
  flex: 3;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem 2rem 0 0;
  padding: 1.5rem;
  position: relative;
}

.action-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
}

.custom-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-cotton-white);
  font-size: 1rem;
  padding: 0.5rem;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.emoji-glass {
  font-size: 1.5rem;
  padding: 0 0.5rem;
}

.upload-section {
  margin-top: auto;
}

.upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-cotton-white);
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.15);
}

.action-btn {
  background: transparent;
  border: none;
  color: var(--color-cotton-white);
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.1);
}

.icon {
  font-size: 1.2rem;
}

.btn-text {
  font-size: 1rem;
}

.hidden-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  opacity: 0;
}

/* 玻璃态效果 */
.glass-effect {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-height: 667px) {
  .preview-section {
    flex: 6;
  }
  
  .action-section {
    flex: 4;
  }
  
  .empty-icon {
    font-size: 3rem;
  }
  
  .empty-text {
    font-size: 1rem;
  }
}
</style>
