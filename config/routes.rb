Rails.application.routes.draw do
  devise_for :users
  root to: 'lounges#index'
  resources :lounges, only: [:index, :new, :create, :show]
end
