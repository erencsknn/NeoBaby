// Simüle edilen HTML yapısı
const html = `
    <!-- Gerekli HTML kodları buraya gelebilir -->
`;

// Test senaryosu
describe("Chat App Test", function () {
    // Test için yapının oluşturulması
    beforeEach(function () {
        document.body.innerHTML = html;
    });

    it("should add a member to DOM", async function () {
        // Simüle edilen rtmClient.getUserAttributesByKeys() fonksiyonu için sahte bir sınıf kullanabiliriz.
        class AgoraRTM {
            static async createInstance(appId) {
                return {
                    getUserAttributesByKeys: async (MemberId, keys) => {
                        // Kullanıcının ismini ve diğer özelliklerini döndürmek için uygun bir nesne oluşturuyoruz.
                        return {
                            name: "Test User",
                        };
                    },
                };
            }
        }

        // AgoraRTM.createInstance fonksiyonunu değiştirerek sahte sınıfımızı kullanıyoruz.
        AgoraRTM.createInstance = () => new AgoraRTM();

        // addMemberToDom fonksiyonunu çağırmadan önce bir üye ID'si oluşturuyoruz.
        const MemberId = "testUser123";

        // addMemberToDom fonksiyonunu çağırıyoruz.
        await addMemberToDom(MemberId);

        // Beklenen HTML çıktısı
        const expectedHTML = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                                <span class="green__icon"></span>
                                <p class="member_name">Test User</p>
                              </div>`;

        // Beklenen HTML çıktısının DOM'da var olup olmadığını kontrol ediyoruz.
        expect(document.getElementById(`member__${MemberId}__wrapper`).outerHTML).toBe(expectedHTML);
    });

    it("should remove a member from DOM", async function () {
        // Simüle edilen rtmClient.getUserAttributesByKeys() fonksiyonu için sahte bir sınıf kullanabiliriz.
        class AgoraRTM {
            static async createInstance(appId) {
                return {
                    getUserAttributesByKeys: async (MemberId, keys) => {
                        // Kullanıcının ismini ve diğer özelliklerini döndürmek için uygun bir nesne oluşturuyoruz.
                        return {
                            name: "Test User",
                        };
                    },
                };
            }
        }

        // AgoraRTM.createInstance fonksiyonunu değiştirerek sahte sınıfımızı kullanıyoruz.
        AgoraRTM.createInstance = () => new AgoraRTM();

        // removeMemberFromDom fonksiyonunu çağırmadan önce bir üye ID'si oluşturuyoruz.
        const MemberId = "testUser123";

        // Üye wrapper'ı oluşturuyoruz ve DOM'a ekliyoruz.
        const memberWrapper = document.createElement("div");
        memberWrapper.id = `member__${MemberId}__wrapper`;
        memberWrapper.innerHTML = `
            <span class="green__icon"></span>
            <p class="member_name">Test User</p>
        `;
        document.body.appendChild(memberWrapper);

        // removeMemberFromDom fonksiyonunu çağırıyoruz.
        await removeMemberFromDom(MemberId);

        // Beklenen sonuç, üyenin DOM'dan kaldırıldığını kontrol ediyoruz.
        expect(document.getElementById(`member__${MemberId}__wrapper`)).toBeNull();
    });

    // Diğer test senaryoları buraya eklenebilir...
});

// Testi başlat
jasmine.getEnv().execute();
