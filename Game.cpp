#include "Game.h"

/**
 * @brief Initializes the app's window
 * 
 */
void Game::initWindow() {
    this->videoMode.height = 900;
    this->videoMode.width = 1600;
    this->window = new sf::RenderWindow(this->videoMode, "Chess app", sf::Style::Titlebar | sf::Style::Close);
    this->window->setFramerateLimit(60);
}

/**
 * @brief Initializes app variables
 * 
 */
void Game::initVariables() {
    this->window = nullptr;
}

void Game::initFonts() {
    this->font.loadFromFile("./dosis-light.ttf");
}


/*****************************************************************************************/
// Constructor + destructor //

Game::Game() {
    this->initVariables();
    this->initWindow();
    this->initFonts();
}

Game::~Game() {
    delete this->window;
}

/****************************************************************************************/
// Accessors //

const bool Game::isRunning() const {
    return this->window->isOpen();
}

/****************************************************************************************/
// Functions //

/**
 * @brief Handles event polling
 * 
 */
void Game::pollEvents() {
    while (this->window->pollEvent(this->ev)) {
        switch (this->ev.type)
        {
            case sf::Event::Closed:
                this->window->close();
                break;
            case sf::Event::KeyPressed:
                if (this->ev.key.code == sf::Keyboard::Escape)
                    this->window->close();
                break;
        }
    }
}

/**
 * @brief Update app variables
 * 
 */
void Game::update() {
    this->pollEvents();
}

/**
 * @brief Renders UI
 * 
 */
void Game::render() {
    this->window->clear();
    this->window->display();
}

