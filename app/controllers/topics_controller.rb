class TopicsController < ApplicationController
  def create
    topic = Topic.create(name: params[:name], lounge_id: params[:lounge_id])
    render json:{ topic: topic }
  end

  def destroy
    Topic.find(params[:id]).destroy
    head :no_content
  end
end
