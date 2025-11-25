document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------
       TRACK SCROLL DIRECTION
    ---------------------------------------------- */
    let lastY = window.scrollY;
    let direction = "down";

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        direction = currentY > lastY ? "down" : "up";
        lastY = currentY;
    });

    /* ----------------------------------------------
       REVEAL ELEMENTS ON SCROLL (ALWAYS REPEAT)
    ---------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                // Reset animation classes
                entry.target.classList.remove("from-bottom", "from-top", "in-view");

                // Force reflow for restart animation
                void entry.target.offsetWidth;

                // Apply animation depending on direction
                if (direction === "down") {
                    entry.target.classList.add("from-bottom");
                } else {
                    entry.target.classList.add("from-top");
                }

                // Make visible
                entry.target.classList.add("in-view");
            } 
            else {
                // When leaving the screen, reset so it can animate again
                entry.target.classList.remove("from-bottom", "from-top", "in-view");
            }

        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ----------------------------------------------
       ANIMATION ON MENU CLICK
    ---------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const id = this.getAttribute("href");

            if (id.length <= 1) return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();

            const headerOffset = document.getElementById("main-header").offsetHeight || 100;
            const pos = target.getBoundingClientRect().top + window.scrollY - headerOffset - 10;

            const goingDown = pos > window.scrollY;
            direction = goingDown ? "down" : "up";

            window.scrollTo({
                top: pos,
                behavior: "smooth"
            });

            // Animate all reveal children of the target section
            const children = target.querySelectorAll(".reveal");
            children.forEach(el => {
                el.classList.remove("from-bottom", "from-top", "in-view");

                setTimeout(() => {
                    if (direction === "down") {
                        el.classList.add("from-bottom");
                    } else {
                        el.classList.add("from-top");
                    }
                    void el.offsetWidth;
                    el.classList.add("in-view");
                }, 200);
            });

        });
    });

    /* ----------------------------------------------
       NAV ACTIVE SECTION
    ---------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => {
                    l.classList.toggle("active", l.dataset.target === entry.target.id);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll("section").forEach(sec => navObserver.observe(sec));

});
