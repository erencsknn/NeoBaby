const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const deletePopup = document.getElementById("delete-popup");
const confirmDeleteButton = document.getElementById("confirm-delete-btn");
const cancelDeleteButton = document.getElementById("cancel-delete-btn");

let img_src;

// Function to handle user's profile picture selection
const selectProfile = (profileImg) => {
    const userImgElements = document.querySelectorAll(".outgoing .chat-details img");
    if (userImgElements.length > 0) {
        userImgElements.forEach(img => {
            img.src = profileImg.src;
            img_src = profileImg.src;
        });
    }
    closePopup();
};

// Function to close the pop-up
const closePopup = () => {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
};

// Show the pop-up when the page loads
window.addEventListener("load", () => {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
});


let userText = null;
const API_KEY = "API KEY";
const initialHeight = chatInput.scrollHeight;

const loadDataFromLocalstorage = () => {
    // Yerel depolamadan tema rengini al ve uygun tema sınıfını ekle
    const themeColor = localStorage.getItem("theme-color");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    
    // Tema düğmesinin metnini güncelle
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>Innovatech Chat</h1>
                            <p>The unusual symptom system developed with <strong> Artificial Intelligence </strong> is with you.</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

loadDataFromLocalstorage();

const createElement = (html, className) => {
    // Verilen HTML ve sınıf adıyla bir div öğesi oluştur
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;
}

const getChatResponse = async (incomingChatDiv) => {
     // OpenAI API'siyle sohbet yanıtını almak için istek gönder
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": userText,
            "max_tokens": 2048,
            "temperature": 0.2,
            "n": 1,
            "stop": null
        })
    }

    // API'ye isteği gönder ve gelen cevabı işle
    try{
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch(error) {
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }

    // Yazılıyor animasyonunu kaldır ve AI yanıtını sohbet detaylarına ekle
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    // Sohbet geçmişini yerel depolamaya kaydet
    localStorage.setItem("all-chats", chatContainer.innerHTML);
}

const copyResponse = (copyBtn) => {
    // Kopyalama düğmesinin üzerinde bulunduğu sohbet yanıtı elementini seç
    const responseTextElement = copyBtn.parentElement.querySelector("p");
    
    // Yanıt metnini panoya kopyala
    navigator.clipboard.writeText(responseTextElement.textContent);
    
    // Kopyalama işleminin başarılı olduğunu belirtmek için düğme metnini güncelle
    copyBtn.textContent = "done";

    // Bir süre sonra düğme metnini yeniden "content_copy" olarak geri al
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

const showTypingAnimation = () => {
    // Yazılıyor animasyonunu içeren HTML kodunu oluştur
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/chatbot.jpg" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div> `;

    // Yazılıyor animasyonunu içeren gelen sohbet divini oluştur
    const incomingChatDiv = createElement(html, "incoming");
    
    // Gelen sohbet divini sohbet konteynerine ekle
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    
    // AI yanıtını almak için fonksiyonu çağır
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {

    // Kullanıcının girdiği metni al ve gereksiz boşlukları temizle
    userText = chatInput.value.trim();
    if(!userText) return;

    // Girdi alanını temizle ve yüksekliği sıfırla
    chatInput.value = "";
    chatInput.style.height = `${initialHeight}px`;


    // Giden sohbet divini oluştur
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="${img_src}" alt="user-img">
                       <p></p>
                    </div>    
                </div>`;


    const outgoingChatDiv = createElement(html, "outgoing");
    
    // Giden sohbet divine kullanıcının metnini ekle
    outgoingChatDiv.querySelector("p").textContent = userText;
    
    // Varsayılan metni kaldır (eğer varsa)
    document.querySelector(".default-text")?.remove();

    // Giden sohbet divini sohbet konteynerine ekle
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    // Yazılıyor animasyonunu belirli bir süre sonra göster
    setTimeout(showTypingAnimation, 500);            
}

themeButton.addEventListener("click", () => {
    // Tema düğmesine tıklandığında, tema modunu değiştir ve yerel depolamada sakla
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme-color", themeButton.innerText);
    
    // Tema düğmesinin metnini güncelle
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});


//#region  Delete All Function

deleteButton.addEventListener("click", () => {
    // Show the custom delete popup instead of the default alert
    deletePopup.style.display = "flex";
});

confirmDeleteButton.addEventListener("click", () => {
    // When the user clicks "Delete" on the popup, delete the chats
    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();

    // Hide the popup
    deletePopup.style.display = "none";
});

cancelDeleteButton.addEventListener("click", () => {
    // When the user clicks "Cancel" on the popup, hide the popup
    deletePopup.style.display = "none";
});

//#endregion


chatInput.addEventListener("input", () => {
    // Giriş alanının yüksekliğini ayarla
    chatInput.style.height =  `${initialHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        
        // Enter tuşuna basıldığında ve koşullar sağlandığında giden sohbeti işle
        handleOutgoingChat();
    }
});

sendButton.addEventListener("click", handleOutgoingChat);


