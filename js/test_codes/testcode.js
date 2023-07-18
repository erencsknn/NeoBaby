// Test senaryosu
describe("Chatbot Test", function () {
    // Simüle edilen HTML yapısı
    const html = `
        <div class="header">
            <button id="menu-btn"></button>
            <nav class="nav">
                <!-- Nav içeriği -->
            </nav>
        </div>

        <div class="login-form">
            <!-- Login form içeriği -->
        </div>

        <button id="login-btn">Login</button>
        <button id="close-login-form">Close Login Form</button>

        <div class="chatbox">
            <!-- Chat kutusu içeriği -->
        </div>

        <div class="chatbot-toggler">Chatbot Toggler</div>
        <div class="chat-input">
            <textarea></textarea>
            <span>Send</span>
        </div>
        <div class="close-btn">Close</div>
    `;
    
    // Test için yapının oluşturulması
    beforeEach(function () {
        document.body.innerHTML = html;
    });

    it("should open login form", function () {
        const loginButton = document.getElementById("login-btn");
        const loginForm = document.querySelector(".login-form");

        expect(loginForm.classList.contains("active")).toBe(false);
        loginButton.click();
        expect(loginForm.classList.contains("active")).toBe(true);
    });

    it("should close login form", function () {
        const loginButton = document.getElementById("login-btn");
        const closeButton = document.getElementById("close-login-form");
        const loginForm = document.querySelector(".login-form");

        loginButton.click();
        expect(loginForm.classList.contains("active")).toBe(true);
        closeButton.click();
        expect(loginForm.classList.contains("active")).toBe(false);
    });

    it("should toggle chatbox", function () {
        const menuButton = document.getElementById("menu-btn");
        const navbar = document.querySelector(".header .nav");

        expect(menuButton.classList.contains("fa-times")).toBe(false);
        expect(navbar.classList.contains("active")).toBe(false);
        menuButton.click();
        expect(menuButton.classList.contains("fa-times")).toBe(true);
        expect(navbar.classList.contains("active")).toBe(true);
        menuButton.click();
        expect(menuButton.classList.contains("fa-times")).toBe(false);
        expect(navbar.classList.contains("active")).toBe(false);
    });

    // Diğer test senaryoları buraya eklenebilir...
});

// Testi başlat
jasmine.getEnv().execute();
