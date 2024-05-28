class User < ApplicationRecord
  has_many :game_rounds
  validates :choice, inclusion: { in: %w[rock paper scissor] }
end
