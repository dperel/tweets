Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "twitter#main"

  get 'main', to: :main, controller: 'twitter'

  post 'pull_tweets', to: :pull, controller: 'twitter'

end
