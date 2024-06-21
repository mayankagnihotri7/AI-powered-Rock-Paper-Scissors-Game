# frozen_string_literal: true

class GameRoundsController < ApplicationController
  def index
    game_round = GameRound.all

    render json: { game_round: }
  end

  def create
    choice = game_round_params[:choice]
    game_round = GameRound.new(choice:)
    game_round.ai_choice = predict_user_choice(GameRound.all)
    game_round.result = determine_winner(choice, game_round.ai_choice)

    if game_round.save
      render json: { game_round: }
    else
      render json: { error: game_round.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def game_round_params
      params.require(:game_round).permit(:choice)
    end

    def predict_user_choice(game_rounds)
      last_rounds = game_rounds.order(created_at: :desc).limit(3)
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

    def determine_winner(choice, ai_choice)
      if choice == ai_choice
        "tie"
      elsif (choice == "rock" && ai_choice == "paper") ||
        (choice == "paper" && ai_choice == "scissors") ||
        (choice == "scissors" && ai_choice == "rock")
        "lose"
      else
        "win"
      end
    end
end
