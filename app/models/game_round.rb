# frozen_string_literal: true

class GameRound < ApplicationRecord
  validates :choice, inclusion: { in: %w[rock paper scissor] }
end
