
// Gestion des onglets
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  function activateTab(tabId) {
    // Désactiver tous les onglets
    tabs.forEach((t) => {
      t.classList.remove("active", "bg-blue-100", "text-blue-800");
      t.classList.add("text-gray-500");
    });

    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });

    // Activer l'onglet sélectionné
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add("active", "bg-blue-100", "text-blue-800");
    selectedTab.classList.remove("text-gray-500");

    const targetContentId = tabId.replace("tab-", "content-");
    const targetContent = document.getElementById(targetContentId);
    if (targetContent) {
      targetContent.classList.remove("hidden");
    }

    // Faire défiler vers l'onglet actif sur mobile si nécessaire
    if (window.innerWidth <= 768) {
      const tabsContainer = document.querySelector(".tabs-container");
      const tabPosition = selectedTab.offsetLeft;
      const containerWidth = tabsContainer.offsetWidth;
      const scrollPosition =
        tabPosition - containerWidth / 2 + selectedTab.offsetWidth / 2;

      tabsContainer.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.id);
    });
  });

  // Activer le premier onglet par défaut
  activateTab("tab-personal");
});
