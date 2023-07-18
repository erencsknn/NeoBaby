// Test senaryosu
describe("Chat App Test", function () {
    // Test için yapının oluşturulması
    beforeEach(function () {
        document.body.innerHTML = html;
    });

    it("should toggle member container display", function () {
        // Simüle edilen HTML yapısına göre gerekli elementler oluşturuluyor.
        const memberContainer = document.createElement("div");
        memberContainer.id = "members__container";
        memberContainer.style.display = "none";
        document.body.appendChild(memberContainer);

        const memberButton = document.createElement("button");
        memberButton.id = "members__button";
        document.body.appendChild(memberButton);

        // memberButton tıklanabilirlik durumu kontrol ediliyor.
        expect(activeMemberContainer).toBeFalse();
        memberButton.click();
        expect(activeMemberContainer).toBeTrue();
        memberButton.click();
        expect(activeMemberContainer).toBeFalse();
    });

    it("should toggle chat container display", function () {
        // Simüle edilen HTML yapısına göre gerekli elementler oluşturuluyor.
        const chatContainer = document.createElement("div");
        chatContainer.id = "messages__container";
        chatContainer.style.display = "none";
        document.body.appendChild(chatContainer);

        const chatButton = document.createElement("button");
        chatButton.id = "chat__button";
        document.body.appendChild(chatButton);

        // chatButton tıklanabilirlik durumu kontrol ediliyor.
        expect(activeChatContainer).toBeFalse();
        chatButton.click();
        expect(activeChatContainer).toBeTrue();
        chatButton.click();
        expect(activeChatContainer).toBeFalse();
    });

    // Diğer test senaryoları buraya eklenebilir...
});

// Testi başlat
jasmine.getEnv().execute();