/**
 * 주성회계법인 - 모던 JavaScript
 * 바닐라 JS로 구현된 인터랙션
 */

class JuseongWebsite {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.backToTop = document.getElementById('back-to-top');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupNavbarScroll();
        this.setupBackToTop();
        this.setupMobileMenu();
        this.setupAnimations();
    }

    setupEventListeners() {
        // DOM이 완전히 로드된 후 실행
        document.addEventListener('DOMContentLoaded', () => {
            console.log('주성회계법인 웹사이트 로드 완료');
        });

        // 윈도우 리사이즈 이벤트
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    setupSmoothScrolling() {
        // 페이지 내부 섹션 링크에만 부드러운 스크롤 적용
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // #으로 시작하는 섹션 링크인 경우에만 스무스 스크롤 적용
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 100; // 네비게이션 높이만큼 오프셋
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // 모바일 메뉴 닫기
                        this.closeMobileMenu();
                    }
                }
                // 페이지 링크인 경우는 기본 동작 허용 (페이지 이동)
            });
        });
    }

    setupNavbarScroll() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', this.throttle(() => {
            const currentScrollY = window.scrollY;
            
            // 스크롤 시 네비게이션 배경 변경
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // 데스크탑에서는 네비게이션을 항상 표시, 모바일에서만 숨김/표시 기능 적용
            if (window.innerWidth <= 768) {
                // 모바일에서만 스크롤 방향에 따른 네비게이션 숨김/표시
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    // 아래로 스크롤 시 네비게이션 숨김
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    // 위로 스크롤 시 네비게이션 표시
                    this.navbar.style.transform = 'translateY(0)';
                }
            } else {
                // 데스크탑에서는 항상 네비게이션 표시
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, 100));
    }

    setupBackToTop() {
        if (!this.backToTop) return;

        window.addEventListener('scroll', this.throttle(() => {
            if (window.scrollY > 500) {
                this.backToTop.classList.add('visible');
            } else {
                this.backToTop.classList.remove('visible');
            }
        }, 100));

        this.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupMobileMenu() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // 메뉴 열림/닫힘 상태에 따른 aria 속성 설정
        const isOpen = this.navMenu.classList.contains('active');
        this.navToggle.setAttribute('aria-expanded', isOpen);
        this.navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    }

    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navToggle.setAttribute('aria-label', '메뉴 열기');
    }

    setupAnimations() {
        // Intersection Observer를 사용한 스크롤 애니메이션
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // 애니메이션 대상 요소들
        const animateElements = document.querySelectorAll('.service-card, .team-member, .section-header');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    handleResize() {
        // 모바일에서 데스크톱으로 전환 시 메뉴 닫기
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // 유틸리티 함수들
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// 서비스 카드 호버 효과
class ServiceCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }

    addHoverEffect(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
    }

    removeHoverEffect(card) {
        card.style.transform = '';
        card.style.boxShadow = '';
    }
}

// 팀 멤버 카드 효과
class TeamMemberEffects {
    constructor() {
        this.members = document.querySelectorAll('.team-member');
        this.init();
    }

    init() {
        this.members.forEach(member => {
            const image = member.querySelector('.team-image img');
            
            if (image) {
                image.addEventListener('mouseenter', () => {
                    image.style.transform = 'scale(1.05)';
                    image.style.filter = 'brightness(1.1)';
                });

                image.addEventListener('mouseleave', () => {
                    image.style.transform = '';
                    image.style.filter = '';
                });
            }
        });
    }
}

// 로딩 애니메이션
class LoadingAnimation {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.init();
    }

    init() {
        // 페이지 로드 완료 시 로더 숨기기
        window.addEventListener('load', () => {
            if (this.loader) {
                this.loader.style.opacity = '0';
                setTimeout(() => {
                    this.loader.style.display = 'none';
                }, 300);
            }
        });
    }
}

// 폼 검증 (향후 연락처 폼 추가 시 사용)
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, '필수 입력 항목입니다.');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        return isValid;
    }

    showError(input, message) {
        this.clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
        input.classList.add('error');
    }

    clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }

    submitForm() {
        // 폼 제출 로직
        console.log('폼 제출됨');
    }
}

// 성능 최적화를 위한 이미지 지연 로딩
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // IntersectionObserver를 지원하지 않는 브라우저를 위한 폴백
            this.images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// 접근성 개선
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
        // 모든 인터랙티브 요소에 키보드 접근성 추가
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
        
        interactiveElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.tagName === 'A') {
                        element.click();
                    }
                }
            });
        });
    }

    setupFocusManagement() {
        // 포커스 트랩 설정 (모달 등에서 사용)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    setupAriaLabels() {
        // 동적 콘텐츠에 aria-live 영역 추가
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }

    handleTabNavigation(e) {
        // 포커스 관리 로직
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

// 에러 핸들링
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript 에러:', e.error);
            this.logError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('처리되지 않은 Promise 거부:', e.reason);
            this.logError(e.reason);
        });
    }

    logError(error) {
        // 에러 로깅 로직 (필요시 서버로 전송)
        console.log('에러 로그:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
    }
}

// 애플리케이션 초기화
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 메인 애플리케이션 초기화
        new JuseongWebsite();
        new ServiceCardEffects();
        new TeamMemberEffects();
        new LoadingAnimation();
        new LazyImageLoader();
        new AccessibilityEnhancer();
        new ErrorHandler();

        console.log('주성회계법인 웹사이트 초기화 완료');
    } catch (error) {
        console.error('애플리케이션 초기화 중 오류 발생:', error);
    }
});

// 전역 유틸리티 함수들
window.JuseongUtils = {
    // 스크롤을 특정 요소로 이동
    scrollToElement: (elementId, offset = 80) => {
        const element = document.getElementById(elementId);
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // 요소가 뷰포트에 보이는지 확인
    isElementInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // 디바운스 함수
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 스로틀 함수
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

