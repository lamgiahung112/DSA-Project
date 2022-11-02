#pragma once

#include <iostream>

#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Window.hpp>
#include <SFML/Audio.hpp>
#include <SFML/Network.hpp>

class Game {
    private:
        sf::RenderWindow* window;
        sf::VideoMode videoMode;
        sf::Event ev;

        // Mouse pos
        sf::Vector2f mousePosView;

        // Resource
        sf::Font font;

        // Methods
        void initWindow();
        void initVariables();
        void initFonts();
    public:
        // constructor / destructor
        Game();
        virtual ~Game();

        // Accessors
        const bool isRunning() const;

        // Functions
        void pollEvents();

        void update();

        void render();
};