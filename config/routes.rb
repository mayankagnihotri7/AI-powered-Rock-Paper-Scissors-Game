# frozen_string_literal: true

Rails.application.routes.draw do
  resources :game_rounds, except: %i[destroy]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
