Rails.application.routes.draw do
  devise_for :users
  root to: 'lounges#index'
  resources :lounges do
    get 'password/request', to: 'lounges#password_request'
    post 'password/check', to: 'lounges#check'
    resources :members, only: :create
  end
end
