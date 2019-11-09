class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.where(workspace_id: params[:workspace_id])
    render 'api/channels/index'
  end

  def show
    @channel = Channel.find_by_id(params[:id])
    if @channel
      render 'api/channels/show'
    else
      render json: ["Channel doesn't exist"], status: 401
    end
  end

  # DESIGN: This is designed to be passed an object containing the workspace_id
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render 'api/channels/show'
    else
      render json: ["Channel name already exists"], status: 401
    end
  end

  def destroy
    @channel = Channel.find_by_id(params[:id])
    if @channel
      @channel.destroy
      render 'api/channels/show'
    else
      render json: ["Channel doesn't exist"], status: 401
    end
  end

  private

  def channel_params 
    params.require(:channel).permit(:name, :workspace_id)
  end
end