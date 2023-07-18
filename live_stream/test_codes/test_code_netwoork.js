// Test senaryosu
describe("Network Connection Test", function () {
    // Test için yapının oluşturulması
    beforeEach(function () {
        document.body.innerHTML = html;
    });

    it("should handle popup for online connection", async function () {
        // Online bir bağlantı olduğunu simüle ediyoruz.
        spyOn(window, "fetch").and.returnValue(Promise.resolve({ status: 200 }));
        
        // Online bağlantı durumunu kontrol ediyoruz.
        await checkConnection();

        // Beklenen HTML çıktısı
        const expectedHTML = `
            <div class="popup online">
                <div class="icon"><i class="uil uil-wifi"></i></div>
                <div class="title">Restored Connection</div>
                <div class="desc">Your device is now successfully connected to the internet.</div>
            </div>
        `;

        // Beklenen HTML çıktısının DOM'da var olup olmadığını kontrol ediyoruz.
        expect(document.querySelector(".popup")).toBeTruthy();
        expect(document.querySelector(".popup").outerHTML).toBe(expectedHTML);

        // Popupın 2 saniye sonra gizlendiğini kontrol ediyoruz.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        expect(document.querySelector(".popup")).toBeFalsy();
    });

    it("should handle popup for offline connection", async function () {
        // Offline bir bağlantı olduğunu simüle ediyoruz.
        spyOn(window, "fetch").and.returnValue(Promise.reject(new Error("Network error")));
        
        // Offline bağlantı durumunu kontrol ediyoruz.
        await checkConnection();

        // Beklenen HTML çıktısı
        const expectedHTML = `
            <div class="popup show">
                <div class="icon"><i class="uil uil-wifi-slash"></i></div>
                <div class="title">Lost Connection</div>
                <div class="desc">Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.</div>
            </div>
        `;

        // Beklenen HTML çıktısının DOM'da var olup olmadığını kontrol ediyoruz.
        expect(document.querySelector(".popup")).toBeTruthy();
        expect(document.querySelector(".popup").outerHTML).toBe(expectedHTML);

        // Popupın 10 saniye sonra gizlenip tekrar bağlantı kontrolünü yapacağını kontrol ediyoruz.
        await new Promise((resolve) => setTimeout(resolve, 10000));
        expect(document.querySelector(".popup")).toBeFalsy();
        expect(window.fetch).toHaveBeenCalled();
    });

    // Diğer test senaryoları buraya eklenebilir...
});

// Testi başlat
jasmine.getEnv().execute();