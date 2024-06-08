# frozen_string_literal: true

class GameRoundsController < ApplicationController
  def create
    @game_round = GameRound.new(choice: params[:choice])
    @ai_choice = predict_user_choice(@game_round.user)

    if @game_round.save
      render json: { game_round: @game_round }
    else
      render json: { error: @game_round.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def predict_user_choice(user)
      last_rounds = user.game_rounds.order(created_at: :desc).limit(3)
      return %w[rock paper scissor].sample if last_rounds.empty?

      choices = last_rounds.map(&:choice)
      choice_count = Hash.new(0)
      choices.each { |choice| choice_count[choice] += 1 }
      predicted_choice = find_pattern(choices)

      case predicted_choice
      when "rock"
        "paper"
      when "paper"
        "scissor"
      when "scissor"
        "rock"
      else
        %w[rock paper scissor].sample
      end
    end

    def find_pattern(choices)
      pattern_length = 3
      return %w[rock paper scissor].sample if choices.size < pattern_length

      (0..choices.size - pattern_length).each do |idx|
        pattern = choices[idx, pattern_length]
        next_choice_index = idx + pattern_length

        next if next_choice_index >= choices.size
        return choices[next_choice_index] if choices[0, pattern_length] == pattern

        choice_count = Hash.new(0)
        choices.each { |choice| choice_count[choice] += 1 }
        choice_count.max_by { |_, count| count }.first || %w[rock paper scissor].sample
      end
    end
end
