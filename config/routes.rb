Rails.application.routes.draw do
  devise_for :users
  root to: 'lounges#index'
  resources :lounges, only: [:index, :new, :create, :show] do
    get 'password/request', to: 'lounges#password_request'
    post 'password/check', to: 'louges_rooms#check'
  end
end
