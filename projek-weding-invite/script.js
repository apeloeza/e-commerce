// Tunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const openBtn = document.getElementById('openInvitation');
  const closeBtn = document.getElementById('closeInvitation');
  const overlay = document.getElementById('invitationOverlay');
  const music = document.getElementById('backgroundMusic');
  const toggleMusicBtn = document.getElementById('toggleMusic');

  // Log untuk debugging
  console.log('DOM loaded:', {
    openBtn: openBtn,
    closeBtn: closeBtn,
    overlay: overlay,
    music: music
  });

  // Open Invitation
  openBtn.addEventListener('click', () => {
    console.log('Tombol Buka Undangan diklik');
    if (overlay) {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      music.play().catch(e => {
        console.error('Error memutar musik:', e);
        alert('Musik tidak bisa dimainkan. Silakan coba di browser lain.');
      });
    } else {
      console.error('Overlay tidak ditemukan!');
    }
  });

  // Close Invitation
  closeBtn.addEventListener('click', () => {
    console.log('Tombol Tutup diklik');
    if (overlay) {
      overlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
      music.pause();
    } else {
      console.error('Overlay tidak ditemukan!');
    }
  });

  // Toggle Music
  toggleMusicBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play().catch(e => {
        console.error('Error memutar musik:', e);
        alert('Musik tidak bisa dimainkan.');
      });
      toggleMusicBtn.innerHTML = '🔇';
    } else {
      music.pause();
      toggleMusicBtn.innerHTML = '🔊';
    }
  });

  // Auto-play music saat halaman dimuat
  music.play().catch(e => {
    console.error('Error memutar musik saat load:', e);
    // Tidak perlu error, karena beberapa browser memblokir otomatis
  });

  // Debug: Tambahkan event listener untuk memastikan tombol bekerja
  if (!openBtn) {
    console.error('Tombol "Buka Undangan" tidak ditemukan!');
  }
});